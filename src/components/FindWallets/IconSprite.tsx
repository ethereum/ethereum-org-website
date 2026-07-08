// Check / warning / info glyphs repeated across every wallet's feature matrix,
// defined once and referenced via <use> to keep server-rendered HTML small.
// Shared by the list page and the wallet detail route.
const IconSprite = () => (
  <svg className="hidden" aria-hidden="true">
    <defs>
      <symbol id="fw-icon-check" viewBox="0 0 24 24">
        <path
          d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
          fill="#109E62"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.9268 7.32059C18.5782 7.83241 18.6913 8.77539 18.1795 9.4268L12.6795 16.4268C12.4021 16.7799 11.981 16.9901 11.532 16.9997C11.083 17.0093 10.6534 16.8172 10.3611 16.4763L7.36114 12.9763C6.82201 12.3473 6.89485 11.4003 7.52384 10.8612C8.15283 10.322 9.09978 10.3949 9.63891 11.0239L11.4496 13.1364L15.8205 7.57333C16.3324 6.92192 17.2754 6.80877 17.9268 7.32059Z"
          fill="white"
        />
      </symbol>
      <symbol id="fw-icon-warning" viewBox="0 0 24 24">
        <path
          d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12Z"
          fill="#B80000"
        />
        <path
          d="M17.0607 9.06066C17.6464 8.47487 17.6464 7.52513 17.0607 6.93934C16.4749 6.35355 15.5251 6.35355 14.9393 6.93934L12 9.87868L9.06066 6.93934C8.47487 6.35355 7.52513 6.35355 6.93934 6.93934C6.35355 7.52513 6.35355 8.47487 6.93934 9.06066L9.87868 12L6.93934 14.9393C6.35355 15.5251 6.35355 16.4749 6.93934 17.0607C7.52513 17.6464 8.47487 17.6464 9.06066 17.0607L12 14.1213L14.9393 17.0607C15.5251 17.6464 16.4749 17.6464 17.0607 17.0607C17.6464 16.4749 17.6464 15.5251 17.0607 14.9393L14.1213 12L17.0607 9.06066Z"
          fill="white"
        />
      </symbol>
      <symbol
        id="fw-icon-info"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4" />
        <path d="M12 8h.01" />
      </symbol>
    </defs>
  </svg>
)

export default IconSprite
