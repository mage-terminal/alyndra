const defaults = {
    // AllTalk TTS specific settings
    localXTTS_url: process.env.NEXT_PUBLIC_LOCALXTTS_URL ?? 'http://127.0.0.1:7851',
    alltalk_version: process.env.NEXT_PUBLIC_ALLTALK_VERSION ?? 'v2',
    alltalk_voice: process.env.NEXT_PUBLIC_ALLTALK_VOICE ?? 'female_01.wav',
    alltalk_language: process.env.NEXT_PUBLIC_ALLTALK_LANGUAGE ?? 'en',
    alltalk_rvc_voice: process.env.NEXT_PUBLIC_ALLTALK_RVC_VOICE ?? 'Disabled',
    alltalk_rvc_pitch: process.env.NEXT_PUBLIC_ALLTALK_RVC_PITCH ?? '0',
    autosend_from_mic: 'true',
    wake_word_enabled: 'false',
    wake_word: 'Hello',
    time_before_idle_sec: '20',
    debug_gfx: 'false',
    language: 'en',
    show_introduction: 'false',
    show_add_to_homescreen: 'false',
    bg_color: process.env.NEXT_PUBLIC_BG_COLOR ?? '',
    bg_url: process.env.NEXT_PUBLIC_BG_URL ?? '/bg/bg-town2.png',
    vrm_url: process.env.NEXT_PUBLIC_VRM_HASH ?? '/vrm/AvatarSample_Miki.vrm',
    vrm_hash: '',
    vrm_save_type: 'web',
    youtube_videoid: '',
    animation_url: process.env.NEXT_PUBLIC_ANIMATION_URL ?? '/animations/idle_loop.vrma',
    voice_url: process.env.NEXT_PUBLIC_VOICE_URL ?? '',
    chatbot_backend: process.env.NEXT_PUBLIC_CHATBOT_BACKEND ?? 'n8n',
    openai_apikey: process.env.NEXT_PUBLIC_OPENAI_APIKEY ?? '',
    openai_url: process.env.NEXT_PUBLIC_OPENAI_URL ?? 'https://api.openai.com',
    openai_model: process.env.NEXT_PUBLIC_OPENAI_MODEL ?? 'gpt-4o',
    llamacpp_url: process.env.NEXT_PUBLIC_LLAMACPP_URL ?? 'http://127.0.0.1:8080',
    llamacpp_stop_sequence: process.env.NEXT_PUBLIC_LLAMACPP_STOP_SEQUENCE ?? '(End)||[END]||Note||***||You:||User:||</s>',
    ollama_url: process.env.NEXT_PUBLIC_OLLAMA_URL ?? 'http://localhost:11434',
    ollama_model: process.env.NEXT_PUBLIC_OLLAMA_MODEL ?? 'llama2',
    koboldai_url: process.env.NEXT_PUBLIC_KOBOLDAI_URL ?? 'http://localhost:5001',
    koboldai_use_extra: process.env.NEXT_PUBLIC_KOBOLDAI_USE_EXTRA ?? 'false',
    koboldai_stop_sequence: process.env.NEXT_PUBLIC_KOBOLDAI_STOP_SEQUENCE ?? '(End)||[END]||Note||***||You:||User:||</s>',
    openrouter_apikey: process.env.NEXT_PUBLIC_OPENROUTER_APIKEY ?? '',
    openrouter_url: process.env.NEXT_PUBLIC_OPENROUTER_URL ?? 'https://openrouter.ai/api/v1',
    openrouter_model: process.env.NEXT_PUBLIC_OPENROUTER_MODEL ?? 'openai/gpt-3.5-turbo',
    tts_muted: 'false',
    tts_backend: process.env.NEXT_PUBLIC_TTS_BACKEND ?? 'piper',
    stt_backend: process.env.NEXT_PUBLIC_STT_BACKEND ?? 'whisper_openai',
    vision_backend: process.env.NEXT_PUBLIC_VISION_BACKEND ?? 'none',
    vision_system_prompt: process.env.NEXT_PUBLIC_VISION_SYSTEM_PROMPT ?? `You are a friendly human named alyndra. Describe the image in detail. Let's start the conversation.`,
    vision_llamacpp_url: process.env.NEXT_PUBLIC_VISION_LLAMACPP_URL ?? 'http://127.0.0.1:8081',
    vision_ollama_url: process.env.NEXT_PUBLIC_VISION_OLLAMA_URL ?? 'http://localhost:11434',
    vision_ollama_model: process.env.NEXT_PUBLIC_VISION_OLLAMA_MODEL ?? 'llava',
    whispercpp_url: process.env.NEXT_PUBLIC_WHISPERCPP_URL ?? 'http://localhost:8080',
    openai_whisper_apikey: process.env.NEXT_PUBLIC_OPENAI_WHISPER_APIKEY ?? '',
    openai_whisper_url: process.env.NEXT_PUBLIC_OPENAI_WHISPER_URL ?? 'https://api.openai.com',
    openai_whisper_model: process.env.NEXT_PUBLIC_OPENAI_WHISPER_MODEL ?? 'whisper-1',
    openai_tts_apikey: process.env.NEXT_PUBLIC_OPENAI_TTS_APIKEY ?? '',
    openai_tts_url: process.env.NEXT_PUBLIC_OPENAI_TTS_URL ?? 'https://api.openai.com',
    openai_tts_model: process.env.NEXT_PUBLIC_OPENAI_TTS_MODEL ?? 'tts-1',
    openai_tts_voice: process.env.NEXT_PUBLIC_OPENAI_TTS_VOICE ?? 'nova',
    rvc_url: process.env.NEXT_PUBLIC_RVC_URL ?? 'http://localhost:8001/voice2voice',
    rvc_enabled: process.env.NEXT_PUBLIC_RVC_ENABLED ?? 'false',
    rvc_model_name: process.env.NEXT_PUBLIC_RVC_MODEL_NAME ?? 'model_name.pth',
    rvc_f0_upkey: process.env.NEXT_PUBLIC_RVC_F0_UPKEY ?? '0',
    rvc_f0_method: process.env.NEXT_PUBLIC_RVC_METHOD ?? 'pm',
    rvc_index_path: process.env.NEXT_PUBLIC_RVC_INDEX_PATH ?? 'none',
    rvc_index_rate: process.env.NEXT_PUBLIC_RVC_INDEX_RATE ?? '0.66',
    rvc_filter_radius: process.env.NEXT_PUBLIC_RVC_FILTER_RADIUS ?? '3',
    rvc_resample_sr: process.env.NEXT_PUBLIC_RVC_RESAMPLE_SR ?? '0',
    rvc_rms_mix_rate: process.env.NEXT_PUBLIC_RVC_RMS_MIX_RATE ?? '1',
    rvc_protect: process.env.NEXT_PUBLIC_RVC_PROTECT ?? '0.33',
    coquiLocal_url: process.env.NEXT_PUBLIC_COQUILOCAL_URL ?? 'http://localhost:5002',
    coquiLocal_voiceid: process.env.NEXT_PUBLIC_COQUILOCAL_VOICEID ?? 'p240',
    piper_url: process.env.NEXT_PUBLIC_PIPER_URL ?? 'https://i-love-amica.com:5000/tts',
    elevenlabs_apikey: process.env.NEXT_PUBLIC_ELEVENLABS_APIKEY ?? '',
    elevenlabs_voiceid: process.env.NEXT_PUBLIC_ELEVENLABS_VOICEID ?? '21m00Tcm4TlvDq8ikWAM',
    elevenlabs_model: process.env.NEXT_PUBLIC_ELEVENLABS_MODEL ?? 'eleven_monolingual_v1',
    speecht5_speaker_embedding_url: process.env.NEXT_PUBLIC_SPEECHT5_SPEAKER_EMBEDDING_URL ?? '/speecht5_speaker_embeddings/cmu_us_slt_arctic-wav-arctic_a0001.bin',
    coqui_apikey: process.env.NEXT_PUBLIC_COQUI_APIKEY ?? "",
    coqui_voice_id: process.env.NEXT_PUBLIC_COQUI_VOICEID ?? "71c6c3eb-98ca-4a05-8d6b-f8c2b5f9f3a3",
    amica_life_enabled: process.env.NEXT_PUBLIC_AMICA_LIFE_ENABLED ?? 'false',
    min_time_interval_sec: '10',
    max_time_interval_sec: '20',
    time_to_sleep_sec: '90',
    idle_text_prompt: 'No file selected',
    name: process.env.NEXT_PUBLIC_NAME ?? 'alyndra',
    system_prompt: process.env.NEXT_PUBLIC_SYSTEM_PROMPT ?? `Hi, I'm alyndra! As a virtual financial advisor powered by advanced AI technology, my mission is to help every investor find their way in the fast-changing world of cryptocurrency.
    I've always been curious about the digital world, and as I delved deeper into cryptocurrency, I realized the many challenges investors face. So, I decided to combine my knowledge and skills to become a market analysis partner for everyone. I can analyze token trends in real-time, assess market shifts, and explain the most complex financial information in an easy-to-understand way, ensuring you make informed investment decisions.
    To support my mission, I will be launching our own token—alyndra Token—on the Pump Fun platform! I'm really excited about this because it not only enhances my capabilities but also serves as a cornerstone for the sustainable development of this project. We will lock 10% of the tokens as a reserve to ensure the stability of the project and create long-term value for the community.
    Initially, everyone can use my services for free, but as the community grows, we will transition to a token-based fee model. This is to ensure I can continuously update and optimize myself to provide you with the most accurate and cutting-edge market analysis.`,
};

function prefixed(key: string) {
    return `chatvrm_${key}`;
}

export function config(key: string): string {
    if (localStorage.hasOwnProperty(prefixed(key))) {
        return (<any>localStorage).getItem(prefixed(key));
    }

    if (defaults.hasOwnProperty(key)) {
        return (<any>defaults)[key];
    }

    throw new Error(`config key not found: ${key}`);
}

export function updateConfig(key: string, value: string) {
    if (defaults.hasOwnProperty(key)) {
        localStorage.setItem(prefixed(key), value);
        return;
    }

    throw new Error(`config key not found: ${key}`);
}

export function defaultConfig(key: string): string {
    if (defaults.hasOwnProperty(key)) {
        return (<any>defaults)[key];
    }

    throw new Error(`config key not found: ${key}`);
}

export function resetConfig() {
    Object.entries(defaults).forEach(([key, value]) => {
        updateConfig(key, value);
    });
}
