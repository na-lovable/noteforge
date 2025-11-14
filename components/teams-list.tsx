import { getOrgTeams } from "@/server/organizations";
import RemoveTeamButton from "./remove-team-button";

export default async function TeamsList() {
  const response = await getOrgTeams();
  if (!response.success) {
    return <>Unable to fetch teams</>;
  } else if (response.teams) {
    const teamList = response.teams;
    return (
      <div>
        {teamList.length > 0 ? (
          <ol className="list-decimal list-inside space-y-4">
            {teamList.map((team) => (
                <li key={team.id}>
                  {team.name}{"  "}
                  <RemoveTeamButton teamId={team.id}>Remove Team</RemoveTeamButton>
                </li>
            ))}
          </ol>
        ) : (
          "No teams yet"
        )}
      </div>
    );
  }
}
