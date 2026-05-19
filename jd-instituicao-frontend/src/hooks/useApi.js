import { useState, useCallback } from 'react';

/**
 * Hook profissional para gestão de chamadas à API
 * Encapsula estados de loading, erros e dados
 */
export const useApi = (apiFunc, initialData = null) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    try {
      setLoading(true);
      setError(null);
      // Simula um delay natural de rede para vermos os loadings e testar UI
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const response = await apiFunc(...args);
      setData(response.data);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Ocorreu um erro na comunicação com o servidor.';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunc]);

  return { data, loading, error, execute, setData };
};

export default useApi;
