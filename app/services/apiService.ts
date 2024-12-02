import axios from "axios";

// Функция для получения пользовательского score
export const fetchUserScore = async (token: string, setScore: (score: number) => void) => {
    try {
        const response = await axios.get('/api/getScore', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setScore(response.data.data.data); // Устанавливаем score через переданную функцию
    } catch (error) {
        console.error('Error fetching score:', error);
    }
};
