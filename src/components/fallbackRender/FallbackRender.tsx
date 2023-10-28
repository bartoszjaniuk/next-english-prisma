'use client'
export function fallbackRender(error: any) {
    return (
        <div role="alert">
            <p>Coś poszło nie tak...</p>
            <pre style={{ color: "red" }}>{error.message}</pre>
        </div>
    );
}