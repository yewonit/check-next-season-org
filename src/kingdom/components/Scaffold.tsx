/**
 * 공사장의 지브 크레인과 벽에 붙인 비계 (리빌 화면 배경)
 * 밧줄은 도르래에서 팔과 기둥을 따라 내려가 아래의 권양 드럼에 감기고,
 * 팔 뒤쪽에는 균형추가 매달려 있다.
 */
export function Scaffold() {
  return (
    <div className="kb-scaffold" aria-hidden="true">
      <span className="kb-scaffold__mast" />
      <span className="kb-scaffold__strut" />
      <span className="kb-scaffold__line kb-scaffold__line--boom" />
      <span className="kb-scaffold__line kb-scaffold__line--mast" />
      <span className="kb-scaffold__boom" />
      <span className="kb-scaffold__counter-rope" />
      <span className="kb-scaffold__counter" />
      <span className="kb-scaffold__pulley" />
      <span className="kb-scaffold__drum" />
      <span className="kb-scaffold__crank" />
      <span className="kb-scaffold__pole kb-scaffold__pole--a" />
      <span className="kb-scaffold__pole kb-scaffold__pole--b" />
      <span className="kb-scaffold__brace" />
      <span className="kb-scaffold__plank kb-scaffold__plank--hi" />
      <span className="kb-scaffold__plank kb-scaffold__plank--lo" />
    </div>
  );
}
