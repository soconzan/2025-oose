import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const courseService = {
    /**
     * 모든 교육 과정 목록을 조회합니다. 제목으로 검색할 수 있습니다.
     * @param {{ search?: string, skip?: number, limit?: number }} params - 조회 파라미터
     */
    getAllCourses: async (params = {}) => {
        const response = await axios.get(`${API_URL}/api/courses`, { params });
        return response.data;
    },

    /**
     * 새로운 교육 과정을 등록합니다.
     * @param {object} courseData - 생성할 교육 과정 데이터
     */
    registerCourse: async (courseData) => {
        const response = await axios.post(`${API_URL}/api/courses`, courseData);
        return response.data;
    }
};

export default courseService; 