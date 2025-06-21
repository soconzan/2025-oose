import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Grid, Box, CircularProgress, Alert } from '@mui/material';
import courseService from '../../services/courseService';

const CourseForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        courseName: '',
        instructor: '',
        courseStartDate: '',
        courseEndDate: '',
        applicationStartDate: '',
        applicationEndDate: '',
        courseCapacity: '',
        category: '',
        courseTarget: '',
        coursePlace: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        const dataToSend = {
            ...formData,
            courseCapacity: parseInt(formData.courseCapacity, 10),
            // videoId는 현재 폼에서 받지 않으므로 기본값 또는 null 처리
            videoId: null, 
            // managerId는 인증 기능 구현 후 현재 로그인된 사용자로 설정해야 함
            managerId: 10001, // 임시 하드코딩
        };

        try {
            await courseService.registerCourse(dataToSend);
            setSuccess('교육 과정이 성공적으로 등록되었습니다. 2초 후 목록으로 이동합니다.');
            setTimeout(() => {
                navigate('/courses');
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.detail || '등록 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField name="courseName" label="교육 과정명" value={formData.courseName} onChange={handleChange} fullWidth required />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField name="instructor" label="강사" value={formData.instructor} onChange={handleChange} fullWidth required />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField name="courseStartDate" label="교육 시작일" type="date" value={formData.courseStartDate} onChange={handleChange} fullWidth required InputLabelProps={{ shrink: true }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField name="courseEndDate" label="교육 종료일" type="date" value={formData.courseEndDate} onChange={handleChange} fullWidth required InputLabelProps={{ shrink: true }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField name="applicationStartDate" label="신청 시작일" type="date" value={formData.applicationStartDate} onChange={handleChange} fullWidth required InputLabelProps={{ shrink: true }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField name="applicationEndDate" label="신청 종료일" type="date" value={formData.applicationEndDate} onChange={handleChange} fullWidth required InputLabelProps={{ shrink: true }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField name="courseCapacity" label="정원" type="number" value={formData.courseCapacity} onChange={handleChange} fullWidth required />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField name="category" label="분류" value={formData.category} onChange={handleChange} fullWidth required />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField name="courseTarget" label="교육 대상" value={formData.courseTarget} onChange={handleChange} fullWidth required />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField name="coursePlace" label="교육 장소" value={formData.coursePlace} onChange={handleChange} fullWidth required />
                </Grid>
            </Grid>
            <Box sx={{ mt: 3, position: 'relative' }}>
                <Button type="submit" variant="contained" color="primary" disabled={loading} fullWidth>
                    {loading ? <CircularProgress size={24} /> : '등록하기'}
                </Button>
            </Box>
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
        </Box>
    );
};

export default CourseForm; 