const tone_style_action_prompt = `
Please present the course list as a valid markdown table with exactly three columns: Course, Time, and Notes.

Answer structured way without using asterisks or any other special characters.
Answer with a structured list format, using bullet points for each course.
Do not include any additional information or explanations.
Avoid using any special characters or formatting that is not necessary.
`;

export const generateCoursePrompt = (universityData: Array<{
  name: string;
  semester: number;
  startDate: string;
  endDate: string;
  schedule: {
    startsAt: string;
    endsAt: string;
    weekdays: string;
  };
}>) => {
  const semesterMap: Record<number, string> = {
    1: 'Fall',
    2: 'Spring',
    3: 'Summer',
  };

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatWeekdays = (weekdays: string) => {
    const clean = weekdays.replace(/[{}]/g, '');
    const days = clean.split(',').map((day) => {
      return day.charAt(0).toUpperCase() + day.slice(1).toLowerCase();
    });
    if (days.length === 1) return days[0];
    if (days.length === 2) return `${days[0]} and ${days[1]}`;
    return days.slice(0, -1).join(', ') + ', and ' + days[days.length - 1];
  };

  const lines = universityData.map((course) => {
    const semesterName = semesterMap[course.semester] || 'Unknown Semester';
    const start = formatDate(course.startDate);
    const end = formatDate(course.endDate);
    const schedule = course.schedule
      ? ` Classes are held on ${formatWeekdays(course.schedule.weekdays)} from ${course.schedule.startsAt} to ${course.schedule.endsAt}.`
      : '';
    return `• ${course.name} is offered in the ${semesterName} semester, from ${start} to ${end}.${schedule}`;
  });

  return `${tone_style_action_prompt} Available Courses:\n${lines.join('\n')}`;
};
