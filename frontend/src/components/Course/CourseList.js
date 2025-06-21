import React, { useState, useEffect, useCallback } from 'react';
import {
    Box, Typography, TextField, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Paper, Chip
} from '@mui/material';
import courseService from '../../services/courseService'; // API 서비스 임포트

// Debounce 함수 (API 호출 최소화)
const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
};

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const fetchCourses = useCallback(async (search) => {
        setLoading(true);
        try {
            const data = await courseService.getAllCourses({ search: search });
            setCourses(data);
            setError('');
        } catch (err) {
            setError('교육 목록을 불러오는 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    }, []);

    const debouncedFetchCourses = useCallback(debounce(fetchCourses, 400), [fetchCourses]);

    useEffect(() => {
        debouncedFetchCourses(searchTerm);
    }, [searchTerm, debouncedFetchCourses]);

    const formatDate = (dateString) => new Date(dateString).toLocaleDateString('ko-KR');

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
                <Typography variant="h4">교육 과정 조회</Typography>
            </Box>
            <TextField
                fullWidth
                label="교육 제목으로 검색"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ mb: 2 }}
            />
            {loading ? (
                <Typography>로딩 중...</Typography>
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>교육 제목</TableCell>
                                <TableCell>교육 유형</TableCell>
                                <TableCell>교육 기간</TableCell>
                                <TableCell>신청 기간</TableCell>
                                <TableCell>정원</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {courses.map((course) => (
                                <TableRow key={course.courseId}>
                                    <TableCell>{course.courseName}</TableCell>
                                    <TableCell>
                                        <Chip label={course.category} size="small" />
                                    </TableCell>
                                    <TableCell>
                                        {formatDate(course.courseStartDate)} ~ {formatDate(course.courseEndDate)}
                                    </TableCell>
                                    <TableCell>
                                        {formatDate(course.applicationStartDate)} ~ {formatDate(course.applicationEndDate)}
                                    </TableCell>
                                    <TableCell>{course.courseCapacity}명</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
};

export default CourseList; 