
export default function Background() {
  return (
    <div className="fixed top-0 left-0 h-screen w-screen z-0">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        xmlns:svgjs="http://svgjs.dev/svgjs"
        viewBox="0 0 800 450"
        opacity="0.26"
        className="w-full h-full"
      >
        <defs>
          <filter
            id="bbblurry-filter"
            x="-100%"
            y="-100%"
            width="400%"
            height="400%"
            filterUnits="objectBoundingBox"
            primitiveUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feGaussianBlur
              stdDeviation="30"
              x="0%"
              y="0%"
              width="100%"
              height="100%"
              in="SourceGraphic"
              edgeMode="none"
              result="blur"
            ></feGaussianBlur>
          </filter>
        </defs>
        <g filter="url(#bbblurry-filter)">
            <ellipse
                rx="131.5"
                ry="131.5"
                cx="526.6573652787642"
                cy="179.80510781028056"
                fill="rgba(0, 240, 181, 1)"
            >
                <animate
                    attributeName="rx"
                    values="131.5; 200; 131.5"
                    dur="4s"
                    repeatCount="indefinite"
                    begin="0s; 0.3s; 0.6s"
                    calcMode="spline"
                    keySplines="0.42, 0, 0.58, 1"
                />
                <animate
                    attributeName="ry"
                    values="131.5; 200; 131.5"
                    dur="4s"
                    repeatCount="indefinite"
                    begin="0s; 0.3s; 0.6s"
                    calcMode="spline"
                    keySplines="0.42, 0, 0.58, 1"
                />
            </ellipse>
            <ellipse
                rx="131.5"
                ry="131.5"
                cx="447.27295754172593"
                cy="308.616249778054"
                fill="rgba(246, 16, 103, 1)"
            >
                <animate
                    attributeName="rx"
                    values="131.5; 200; 131.5"
                    dur="4s"
                    repeatCount="indefinite"
                    begin="0.15s; 0.45s; 0.75s"
                    calcMode="spline"
                    keySplines="0.42, 0, 0.58, 1"
                />
                <animate
                    attributeName="ry"
                    values="131.5; 200; 131.5"
                    dur="4s"
                    repeatCount="indefinite"
                    begin="0.15s; 0.45s; 0.75s"
                    calcMode="spline"
                    keySplines="0.42, 0, 0.58, 1"
                />
            </ellipse>
            <ellipse
                rx="131.5"
                ry="131.5"
                cx="287.6953971169212"
                cy="181.54864918101921"
                fill="rgba(255, 215, 0, 1)"
            >
                <animate
                    attributeName="rx"
                    values="131.5; 200; 131.5"
                    dur="4s"
                    repeatCount="indefinite"
                    begin="0.3s; 0.6s; 0.9s"
                    calcMode="spline"
                    keySplines="0.42, 0, 0.58, 1"
                />
                <animate
                    attributeName="ry"
                    values="131.5; 200; 131.5"
                    dur="4s"
                    repeatCount="indefinite"
                    begin="0.3s; 0.6s; 0.9s"
                    calcMode="spline"
                    keySplines="0.42, 0, 0.58, 1"
                />
            </ellipse>
        </g>
      </svg>
    </div>
  );
}