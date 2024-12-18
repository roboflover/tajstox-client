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


interface ParsedData {
    user: {
        firstName: string; // Имя пользователя
        lastName?: string; // Фамилия пользователя (если есть)
        username?: string; // Имя пользователя в Telegram (если есть)
        id: number; // Уникальный идентификатор пользователя
    };
}


export const authenticateUser = async (initDataRaw: string|undefined): Promise<{ token: string; parsedData:ParsedData }> => {
    try {

        const response = await axios.post('/api/authenticate', {}, {
            headers: {
                Authorization: `tma ${initDataRaw}`,
            },
        });

        return response.data; // Возвращаем данные от сервера
    } catch (error) {
        console.error('Error during authentication:', error);
        throw error; // Пробрасываем ошибку дальше
    }
};

// Функция для добавления реферальной ссылки
export const addReferralLink = async (referralCode: string): Promise<{ success: boolean; message: string }> => {
    try {
        const response = await axios.post('/api/addReferral', { referralCode }, {
        });

        return {
            success: true,
            message: response.data.message || 'Referral link added successfully',
        };
    } catch (error) {
        console.error('Error adding referral link:', error);
        throw error;
    }
};
