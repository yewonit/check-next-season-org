import { buildCourses } from '../lib/rng';
import { stoneVars } from '../lib/stone';

interface WallCoursesProps {
  seed: string;
  count: number;
  className?: string;
  /** 맨 윗줄을 덜 쌓인 상태로 남긴다 */
  ragged?: boolean;
}

/** 장식용 성벽 줄 (보조기기에는 숨긴다) */
export function WallCourses({
  seed,
  count,
  className,
  ragged,
}: WallCoursesProps) {
  const courses = buildCourses(seed, count);
  return (
    <div
      className={['kb-courses', className].filter(Boolean).join(' ')}
      aria-hidden="true"
    >
      {courses.map((stones, row) => (
        <div
          key={row}
          className={[
            'kb-course',
            ragged && row === 0 ? 'kb-course--ragged' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {stones.map((shape, i) => (
            <span key={i} className="kb-stone" style={stoneVars(shape)} />
          ))}
        </div>
      ))}
    </div>
  );
}
