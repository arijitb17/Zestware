// global.d.ts

declare global {
    namespace JSX {
      interface IntrinsicElements {
        'model-viewer': React.DetailedHTMLProps<React.HTMLProps<HTMLElement>, HTMLElement>;
      }
    }
  }
  
  export {};
  