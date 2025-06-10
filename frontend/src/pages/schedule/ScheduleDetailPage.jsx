import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../components/schedule/Schedule.css';

const SHARE_SCOPE_MAP = {
  0: '전체',
  1: '부서',
  2: '개인'
};