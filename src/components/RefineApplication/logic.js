import { REFINEMENT_TABLE } from './db';

export const RefineResult = {
  SUCCESS: 'success',
  FAIL: 'fail',
  DOWNGRADE: 'downgrade',
  DAMAGE: 'damaged',
}

export function refine(baseLv) {
  const chances = REFINEMENT_TABLE[baseLv + 1];
  const rng = Math.floor(Math.random() * 100);
  if (rng < chances.success) {
    return RefineResult.SUCCESS
  } else if (rng < chances.success + chances.fail) {
    return RefineResult.FAIL
  } else if (rng < chances.success + chances.fail + chances.downgrade) {
    return RefineResult.DOWNGRADE
  } else {
    return RefineResult.DAMAGE
  }
}
