import { Box } from "@mui/material";
import { useFetchTeamsQuery } from "./teamApi";

export default function TeamPage() {
  const { data, isLoading } = useFetchTeamsQuery();

  if (isLoading || !data) return <div>Loading...</div>;

  return (
    <Box>
      <ul>
        {data.map((team) => (
          <li key={team.id}>
            {team.name} {team.city}
          </li>
        ))}
      </ul>
    </Box>
  );
}
