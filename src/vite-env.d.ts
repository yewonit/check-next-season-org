/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  // 필요한 다른 환경 변수를 여기에 추가하세요
  // readonly VITE_OTHER_VAR: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Lottie Web Component 타입 선언
declare namespace JSX {
  interface IntrinsicElements {
    "dotlottie-wc": {
      src: string;
      speed?: string;
      mode?: string;
      autoplay?: boolean;
      style?: React.CSSProperties;
    };
  }
}
