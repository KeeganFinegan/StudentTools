import axios from 'axios';

const url = 'http://localhost:1337/grades';

export const fetchGradeData = async () => {
  try {
    const { data } = await axios.get(url);
    const modifiedData = data.map((gradeData) => ({
      assessement: gradeData.assessement,
      score: gradeData.score,
      grade: gradeData.grade,
      weight: gradeData.weight,
    }));
    return modifiedData;
  } catch (error) {}
};
