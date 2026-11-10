/**
 * 다국어 문구 (2026 시즌과 같은 언어·같은 위치)
 * - 메인 올네이션 진입 문구
 * - 리빌 화면 안내 문구
 * - 올네이션 그룹 선택 제목
 */

export type Lang = 'ko' | 'en' | 'zh' | 'ja' | 'es';

export interface Localized {
  lang: Lang;
  text: string;
}

export const ALL_NATIONS_LINK: Localized[] = [
  { lang: 'ko', text: '올네이션국은 여기를 클릭해주세요' },
  { lang: 'en', text: 'Click here for the All Nations Department' },
  { lang: 'zh', text: '请点击这里进入 All Nations 部门' },
  { lang: 'es', text: 'Haz clic aquí para All Nations Department' },
  { lang: 'ja', text: 'オールネーションズ局はこちら' },
];

export const ALL_NATIONS_TITLE: Localized[] = [
  { lang: 'ko', text: '2026년\n어떤 그룹에 있었나요?' },
  { lang: 'en', text: 'Which group was I\nin for 2026?' },
  { lang: 'zh', text: '2026年\n我属于哪个小组？' },
  { lang: 'ja', text: '2026年、\n私はどのグループ？' },
  { lang: 'es', text: '¿En qué grupo\nestuve en 2026?' },
];

export interface BuildCopy {
  lang: Lang;
  title: string;
  hint: string;
  bottom: string;
}

export const BUILD_COPY: BuildCopy[] = [
  {
    lang: 'ko',
    title: '2027년, 함께 세울\n자리가 준비됐어요!',
    hint: '돌을 눌러 성벽을 쌓아 봐요',
    bottom: '마지막 돌이 놓일 때까지 계속 눌러 봐요!',
  },
  {
    lang: 'en',
    title: 'Your place to build\nin 2027 is ready!',
    hint: 'Tap the stone to build the wall.',
    bottom: 'Keep tapping until the last stone is set!',
  },
  {
    lang: 'zh',
    title: '2027年，我们一同建造的\n位置已经准备好了！',
    hint: '点击石头，一起砌墙吧。',
    bottom: '继续点击，直到放好最后一块石头！',
  },
  {
    lang: 'ja',
    title: '2027年、ともに建てる\n場所が用意されました！',
    hint: '石をタップして城壁を積もう。',
    bottom: '最後の石が置かれるまでタップし続けて！',
  },
  {
    lang: 'es',
    title: '¡Tu lugar para construir\nen 2027 está listo!',
    hint: 'Toca la piedra para levantar el muro.',
    bottom: '¡Sigue tocando hasta colocar la última piedra!',
  },
];
