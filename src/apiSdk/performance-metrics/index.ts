import axios from 'axios';
import queryString from 'query-string';
import { PerformanceMetricInterface, PerformanceMetricGetQueryInterface } from 'interfaces/performance-metric';
import { GetQueryInterface } from '../../interfaces';

export const getPerformanceMetrics = async (query?: PerformanceMetricGetQueryInterface) => {
  const response = await axios.get(`/api/performance-metrics${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createPerformanceMetric = async (performanceMetric: PerformanceMetricInterface) => {
  const response = await axios.post('/api/performance-metrics', performanceMetric);
  return response.data;
};

export const updatePerformanceMetricById = async (id: string, performanceMetric: PerformanceMetricInterface) => {
  const response = await axios.put(`/api/performance-metrics/${id}`, performanceMetric);
  return response.data;
};

export const getPerformanceMetricById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/performance-metrics/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deletePerformanceMetricById = async (id: string) => {
  const response = await axios.delete(`/api/performance-metrics/${id}`);
  return response.data;
};
