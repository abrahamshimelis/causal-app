import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useAutocomplete = (query) => {
  return useQuery({
    queryKey: ['autocomplete', query],
    queryFn: async () => {
      const { data } = await axios.get(
        'https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete'
      );

      // Client-side filtering based on the `name` field
      const filtered = data.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );

      return filtered;
    },
    enabled: !!query, // Only fetch if query is not empty
  });
};
