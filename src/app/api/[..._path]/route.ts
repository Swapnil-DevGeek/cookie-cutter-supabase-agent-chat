import { initApiPassthrough } from "langgraph-nextjs-api-passthrough";
import { AGENT_CONFIG } from "@/config";

// This file acts as a proxy for requests to your LangGraph server.
// Read the [Going to Production](https://github.com/langchain-ai/agent-chat-ui?tab=readme-ov-file#going-to-production) section for more information.

export const { GET, POST, PUT, PATCH, DELETE, OPTIONS, runtime } =
  initApiPassthrough({
    apiUrl: AGENT_CONFIG.LANGGRAPH_API_URL || "remove-me", // Use the centralized config value
    apiKey: AGENT_CONFIG.LANGSMITH_API_KEY || "remove-me", // Use the centralized config value
    runtime: "edge", // default
  });
