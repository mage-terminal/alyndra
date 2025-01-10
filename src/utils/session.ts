export function generateNewSessionId() {
    const sessionId = `${Math.random().toString(36).substr(2, 9)}-${Date.now().toString(36)}`;
    localStorage.setItem("sessionId", sessionId);
    return sessionId;
}

export function getSessionId() {
    return localStorage.getItem("sessionId");
}