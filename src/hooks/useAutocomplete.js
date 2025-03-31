import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useAutocomplete = (query) => {
  return useQuery({
    queryKey: ['autocomplete', query],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://api.example.com/autocomplete?q=${query}`
      );
      return data.suggestions;
    },
    enabled: !!query,
  });
};
