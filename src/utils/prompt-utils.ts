export const generateCoursePrompt = (universityData: Array<{
  name: string;
  semester: number;
  startDate: string;
  endDate: string;
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

  const lines = universityData.map((course) => {
    const semesterName = semesterMap[course.semester] || 'Unknown Semester';
    const start = formatDate(course.startDate);
    const end = formatDate(course.endDate);
    return `• ${course.name} is offered in the ${semesterName} semester, from ${start} to ${end}.`;
  });

  return `Available Courses:\n${lines.join('\n')}`;
}
