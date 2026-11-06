import { MetadataRoute } from 'next';

/**
 * Arama motorları ve yapay zekâ tarayıcıları için açık izin kuralları.
 *
 * Bu botların siteyi taramasına izin verilir; çünkü amaç yalnızca "siteyi
 * görmeleri ve anlamaları" değil, aynı zamanda sohbet botlarının ve yapay
 * zekâ yanıt motorlarının (ChatGPT, Perplexity, Gemini, Copilot vb.)
 * cevaplarında Yeter La'ya kaynak vererek insanları siteye yönlendirmesidir.
 */
const AI_AND_SEARCH_BOTS = [
  // Klasik arama motorları
  'Googlebot',
  'Bingbot',
  'YandexBot',
  'DuckDuckBot',
  'Applebot',
  // Gemini / Vertex AI
  'Google-Extended',
  'Applebot-Extended',
  // OpenAI (ChatGPT + arama)
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  // Anthropic (Claude)
  'ClaudeBot',
  'Claude-Web',
  'anthropic-ai',
  // Perplexity
  'PerplexityBot',
  'Perplexity-User',
  // Diğer yapay zekâ ve veri botları
  'meta-externalagent',
  'Amazonbot',
  'cohere-ai',
  'MistralAI-User',
  'GrokBot',
  'YouBot',
  'DuckAssistBot',
  'CCBot',
  'Bytespider',
];

/** Yapay zekâ botlarına da kapalı tutulan, taranmasında sakınca olan alanlar. */
const DISALLOWED = ['/api/', '/yoklama'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Bot bazlı açık kural: her alan taranabilir, yalnızca teknik alanlar kapalı.
        userAgent: AI_AND_SEARCH_BOTS,
        allow: '/',
        disallow: DISALLOWED,
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: DISALLOWED,
      },
    ],
    sitemap: 'https://yeterla.com/sitemap.xml',
    host: 'https://yeterla.com',
  };
}
