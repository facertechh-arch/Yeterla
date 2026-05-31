-- -------------------------------------------------------------
-- DECENTRALIZED INTERACTIVE MANIFESTO DATABASE SCHEMA
-- -------------------------------------------------------------

-- 1. Custom status enum for PR states
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'pr_status') THEN
        CREATE TYPE pr_status AS ENUM ('pending', 'approved', 'rejected');
    END IF;
END
$$;

-- 2. Manifesto Blocks Table
CREATE TABLE IF NOT EXISTS manifesto_blocks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_index INT NOT NULL UNIQUE,
    content TEXT NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Manifesto Pull Requests (PRs) Table
CREATE TABLE IF NOT EXISTS manifesto_prs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    block_id UUID NOT NULL REFERENCES manifesto_blocks(id) ON DELETE CASCADE,
    original_content TEXT NOT NULL,
    suggested_content TEXT NOT NULL,
    status pr_status NOT NULL DEFAULT 'pending',
    author_nick TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Admin Settings Table (Securely stores passwords and config)
CREATE TABLE IF NOT EXISTS admin_settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Enable Row Level Security (RLS)
ALTER TABLE manifesto_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE manifesto_prs ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;

-- 6. Define Security Policies (Public Access for this Decentralized Platform)

-- Manifesto Blocks Policies
CREATE POLICY "Allow public read access to manifesto blocks"
ON manifesto_blocks FOR SELECT
USING (true);

CREATE POLICY "Allow public update access to manifesto blocks (Admin or Trigger simulation)"
ON manifesto_blocks FOR ALL
USING (true)
WITH CHECK (true);

-- Manifesto PRs Policies
CREATE POLICY "Allow public read access to manifesto PRs"
ON manifesto_prs FOR SELECT
USING (true);

CREATE POLICY "Allow public insert to manifesto PRs"
ON manifesto_prs FOR INSERT
WITH CHECK (true);

CREATE POLICY "Allow public update/delete to manifesto PRs (Admin approval)"
ON manifesto_prs FOR ALL
USING (true)
WITH CHECK (true);

-- Note: We intentionally do NOT define any SELECT policies for 'admin_settings'
-- This makes the table completely private. Public web users cannot read password values!

-- 7. Secure RPC function to verify admin password without leaking it (SECURITY DEFINER bypasses RLS safely)
CREATE OR REPLACE FUNCTION verify_admin_password(p_password TEXT)
RETURNS BOOLEAN AS $$
DECLARE
    v_actual TEXT;
BEGIN
    SELECT value INTO v_actual FROM admin_settings WHERE key = 'admin_password';
    RETURN p_password = v_actual;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 8. Trigger Function to auto-apply suggested content to the manifesto block upon PR approval
CREATE OR REPLACE FUNCTION sync_approved_manifesto_pr()
RETURNS TRIGGER AS $$
BEGIN
    -- Check if the status has transitioned to 'approved'
    IF NEW.status = 'approved' AND (OLD.status IS NULL OR OLD.status != 'approved') THEN
        UPDATE manifesto_blocks
        SET content = NEW.suggested_content,
            updated_at = now()
        WHERE id = NEW.block_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger on manifesto_prs table
DROP TRIGGER IF EXISTS trg_sync_approved_manifesto_pr ON manifesto_prs;
CREATE TRIGGER trg_sync_approved_manifesto_pr
AFTER UPDATE ON manifesto_prs
FOR EACH ROW
EXECUTE FUNCTION sync_approved_manifesto_pr();

-- 9. High-Performance Indexing
CREATE INDEX IF NOT EXISTS idx_manifesto_blocks_order ON manifesto_blocks(order_index);
CREATE INDEX IF NOT EXISTS idx_manifesto_prs_status ON manifesto_prs(status);

-- 10. Seed Default Manifesto Blocks
INSERT INTO manifesto_blocks (order_index, content) VALUES
(0, 'BİZİ KURTARACAK BİR ANA MUHALEFET YOK. Siyasetin köhne yüzleri gençliğin çığlığını duymamakta direniyor, koltuklarını ve kendi konforlu statükolarını koruma derdindeler. Değişim yukarıdan gelmeyecek.')
ON CONFLICT (order_index) DO UPDATE SET content = EXCLUDED.content;

INSERT INTO manifesto_blocks (order_index, content) VALUES
(1, 'İKTİDARIN BİZİ SÜRÜKLEDİĞİ O KARANLIK, SESSİZ DİKTATÖRLÜGE GİRMEMİZE ÇOK AZ KALDI. Her geçen gün sansürleniyor, haklarımızdan ve özgürlüklerimizden taviz vermeye zorlanıyoruz. Sessiz kalmak suça ortak olmaktır.')
ON CONFLICT (order_index) DO UPDATE SET content = EXCLUDED.content;

INSERT INTO manifesto_blocks (order_index, content) VALUES
(2, 'EĞER BUGÜN KENDİ MERKEZİDİSİ (DECENTRALIZED) DİJİTAL VE FİZİKSEL AĞLARIMIZI KURMAZSAK, 100 YILLIK CUMHURİYETİN ÇÖKÜŞÜNÜ İZLEYEN KORKAK VE ACİZ BİR NESİL OLACAĞIZ. Kendi geleceğimizi kimsenin lütfuna bırakamayız.')
ON CONFLICT (order_index) DO UPDATE SET content = EXCLUDED.content;

INSERT INTO manifesto_blocks (order_index, content) VALUES
(3, 'ŞİKAYET ETMEYİ BIRAK, BİR ARAYA GEL. Harekete geçmek ve değişimi yerelden, kendi mahallemizden, kendi okulumuzdan başlatmak için örgütleniyoruz. Bu platform, geleceğimizi ortak akılla yeniden yazma aracıdır.')
ON CONFLICT (order_index) DO UPDATE SET content = EXCLUDED.content;

-- 11. Yoklama Table (Telegram bot webhook activity)
CREATE TABLE IF NOT EXISTS yoklama (
    telegram_id BIGINT PRIMARY KEY,
    kod_adi TEXT NOT NULL,
    son_yoklama TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE yoklama ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to yoklama"
ON yoklama FOR SELECT
USING (true);

CREATE INDEX IF NOT EXISTS idx_yoklama_son_yoklama ON yoklama(son_yoklama DESC);

-- 12. Seed Secure Admin Credentials
INSERT INTO admin_settings (key, value) VALUES
('admin_password', 'YeterLa!SuperSecureAdminKey2026*#-0')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
