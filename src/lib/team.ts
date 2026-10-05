// Team size and ages, read from the facts edited in the admin, so the
// sentences on Home and Team always match the data plate.
import team from '../data/team.json';

const fact = (...labels: string[]) =>
  team.facts.find((f) => labels.includes(f.k.trim().toLowerCase()))?.v.trim() ?? '';

const students = fact('students', 'team members', 'members');
const ages = fact('ages', 'age').replace(/\s*[–-]\s*/, ' to ');

// "15 students aged 14 to 17", or whichever half exists; empty if neither
export const headcount = [students && `${students} students`, ages && `aged ${ages}`]
  .filter(Boolean)
  .join(' ');
