import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

// 다른 api 파일과 동일하게 baseURL 설정
const apiClient = axios.create({
  baseURL: '/api', // package.json의 프록시 설정에 따라 '/api'로 요청
});

// 모든 문서 목록 조회 API
export const getAllDocuments = async () => {
  try {
    const response = await apiClient.get('/documents/');
    return response.data;
  } catch (error) {
    console.error('Error fetching documents:', error);
    throw error;
  }
};

// 특정 문서 ID로 조회 API
export const getDocumentById = async (id) => {
  try {
    const response = await apiClient.get(`/documents/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching document with id ${id}:`, error);
    throw error;
  }
};

// 새 문서 등록 API
export const createDocument = async (documentData) => {
  try {
    const response = await apiClient.post('/documents/', documentData);
    return response.data;
  } catch (error) {
    console.error('Error creating document:', error);
    throw error;
  }
};

// (추가) 문서 수정 API
export const updateDocument = async (id, documentData) => {
  try {
    const response = await apiClient.put(`/documents/${id}`, documentData);
    return response.data;
  } catch (error) {
    console.error(`Error updating document with id ${id}:`, error);
    throw error;
  }
};

// (추가) 문서 삭제 API
export const deleteDocument = async (id) => {
  try {
    const response = await apiClient.delete(`/documents/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting document with id ${id}:`, error);
    throw error;
  }
};