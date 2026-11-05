import type { NextConfig } from "next";

/**
 * Meta verilerin (title/description) HTML <head> içinde engellenmeden (blocking)
 * teslim edilmesi gereken botlar. Varsayılan listenin üzerine, içeriği
 * JavaScript çalıştırmadan okuyan yapay zeka tarayıcıları eklenir.
 */
const HTML_LIMITED_BOTS =
  /Mediapartners-Google|AdsBot-Google|Google-PageRenderer|Googlebot|Google-InspectionTool|bingbot|BingPreview|Twitterbot|Slackbot|facebookexternalhit|LinkedInBot|Applebot|GPTBot|OAI-SearchBot|ChatGPT-User|ClaudeBot|Claude-Web|anthropic-ai|PerplexityBot|Perplexity-User|Google-Extended|Applebot-Extended|CCBot|Bytespider|meta-externalagent|Amazonbot|cohere-ai|YouBot|DuckAssistBot|MistralAI-User|GrokBot/i;

const nextConfig: NextConfig = {
  htmlLimitedBots: HTML_LIMITED_BOTS,
};

export default nextConfig;
