import { Link } from 'react-router-dom';
import coramdeoLogo from '../../assets/coramdeo_logo.png';

/** 코람데오 워드마크 (하늘 위에서는 밝은 단색으로 반전) */
export function Logo({ linkHome = false }: { linkHome?: boolean }) {
  const img = (
    <img
      className="kb-logo"
      src={coramdeoLogo}
      alt="코람데오 CoramDeo"
      width={104}
      height={18}
    />
  );
  if (!linkHome) return img;
  return (
    <Link
      to="/"
      className="kb-logo-link"
      aria-label="처음으로 (코람데오 2027 순배치 확인)"
    >
      {img}
    </Link>
  );
}
