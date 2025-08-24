import { Box } from "@presentation/components/ui/box";
import { Text } from "@presentation/components/ui/text";
import React from "react";
import { useSessionStore } from "@presentation/lib/stores/sessionStore";
import { playerRepository } from "@infrastructure/repositories";
import { Player } from "@domain/player/model";

export default function Home() {
  const session = useSessionStore((s) => s.session);
  const [player, setPlayer] = React.useState<Player | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchPlayer = async () => {
      setLoading(true);
      setError(null);
      try {
        if (session?.user?.id) {
          const p = await playerRepository.findByUserId(session.user.id);
          setPlayer(p);
        }
      } catch (e: any) {
        setError(e.message || "Error fetching player");
      } finally {
        setLoading(false);
      }
    };
    fetchPlayer();
  }, [session?.user?.id]);

  return (
    <Box className="flex-1 justify-center items-center">
      <Text size="2xl" className="font-bold" style={{ marginBottom: 16 }}>
        Welcome to Baller Net
      </Text>
      {session?.user && (
        <Box style={{ marginBottom: 16 }}>
          <Text size="lg">User info:</Text>
          <Text>Email: {session.user.email}</Text>
          <Text>Username: {session.user.username}</Text>
          <Text>User ID: {session.user.id}</Text>
        </Box>
      )}
      {loading && <Text>Loading player data...</Text>}
      {error && <Text style={{ color: "#dc2626" }}>{error}</Text>}
      {player && (
        <Box>
          <Text size="lg">Player info:</Text>
          <Text>Player ID: {player.id}</Text>
          <Text>Archetype: {player.archetype || "-"}</Text>
          <Text>Position: {player.career?.position || "-"}</Text>
          <Text>Username: {player.personal?.username || "-"}</Text>
          <Text>Height: {player.physical?.heightCm || "-"} cm</Text>
          <Text>Weight: {player.physical?.weightKg || "-"} kg</Text>
          {/** Print career */}
          <Text>Team: {player.career?.team || "-"}</Text>
          <Text>League: {player.career?.league || "-"}</Text>
          <Text>Points per Game: {player.career?.pointsPerGame || "-"}</Text>
          <Text>Assists per Game: {player.career?.assistsPerGame || "-"}</Text>
          <Text>
            Rebounds per Game: {player.career?.reboundsPerGame || "-"}
          </Text>
          <Text>Blocks per Game: {player.career?.blocksPerGame || "-"}</Text>
          <Text>Steals per Game: {player.career?.stealsPerGame || "-"}</Text>
        </Box>
      )}
    </Box>
  );
}
