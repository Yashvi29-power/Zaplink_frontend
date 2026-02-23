import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Target,
  DollarSign,
  Users,
  Clock,
  Loader2,
  PlayCircle,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/components/layout/Layout";
import ProgressChart from "@/components/dashboard/ProgressChart";
import { mockChartData } from "@/data/mockData";
import { cn } from "@/lib/utils";

const difficultyColors: Record<string, string> = {
  easy: "bg-green-500/10 text-green-600 border-green-500/20",
  medium: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  hard: "bg-red-500/10 text-red-600 border-red-500/20",
  any: "bg-primary/10 text-primary border-primary/20",
};

const ChallengePage: React.FC = () => {
  const { id } = useParams();

  const [challenge, setChallenge] = useState<any>(null);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isJoining, setIsJoining] = useState(false);
  const [isActivating, setIsActivating] = useState(false);

  // ✅ Mock Data Loader
  useEffect(() => {
    setTimeout(() => {
      setChallenge({
        id,
        name: "30 Day Coding Challenge",
        description:
          "Solve at least 2 problems daily to stay consistent and avoid penalties.",
        startDate: "2026-02-01",
        endDate: "2026-03-02",
        difficultyFilter: ["easy", "medium"],
        status: "ACTIVE",
        ownerId: "1",
        minSubmissionsPerDay: 2,
        penaltyAmount: 5,
      });

      setLeaderboard([
        { userId: "1", userName: "John Doe", totalPenalty: 10 },
        { userId: "2", userName: "Alice Smith", totalPenalty: 0 },
        { userId: "3", userName: "David Lee", totalPenalty: 5 },
      ]);

      setIsLoading(false);
    }, 800);
  }, [id]);

  const handleJoinChallenge = () => {
    setIsJoining(true);
    setTimeout(() => {
      alert("Joined Challenge (Mock)");
      setIsJoining(false);
    }, 800);
  };

  const handleActivateChallenge = () => {
    setIsActivating(true);
    setTimeout(() => {
      alert("Challenge Activated (Mock)");
      setIsActivating(false);
    }, 800);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!challenge) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Challenge not found</h2>
          <Button asChild>
            <Link to="/">Back to Dashboard</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const daysRemaining = Math.ceil(
    (new Date(challenge.endDate).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24)
  );

  const totalDays = Math.ceil(
    (new Date(challenge.endDate).getTime() -
      new Date(challenge.startDate).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  const progress = Math.max(
    0,
    Math.min(100, Math.round(((totalDays - daysRemaining) / totalDays) * 100))
  );

  const difficultyDisplay =
    challenge.difficultyFilter?.length > 0
      ? challenge.difficultyFilter.join(", ")
      : "Any";

  return (
    <Layout>
      <div className="space-y-6">
        {/* Back Button */}
        <Button variant="ghost" size="sm" asChild className="gap-2">
          <Link to="/">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold">{challenge.name}</h1>

              <Badge
                variant="outline"
                className={cn(difficultyColors.any)}
              >
                {difficultyDisplay}
              </Badge>

              <Badge
                variant="outline"
                className={
                  challenge.status === "ACTIVE"
                    ? "bg-green-500/10 text-green-600"
                    : ""
                }
              >
                {challenge.status}
              </Badge>
            </div>

            <p className="text-muted-foreground">
              {challenge.description}
            </p>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(challenge.startDate).toLocaleDateString()} -{" "}
                  {new Date(challenge.endDate).toLocaleDateString()}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{daysRemaining} days left</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              className="gap-2 gradient-primary"
              onClick={handleActivateChallenge}
              disabled={isActivating}
            >
              {isActivating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <PlayCircle className="h-4 w-4" />
              )}
              Activate Challenge
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={handleJoinChallenge}
              disabled={isJoining}
            >
              {isJoining ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Users className="h-4 w-4" />
              )}
              Join Challenge
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <Target className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Daily Target</p>
                <p className="text-xl font-semibold">
                  {challenge.minSubmissionsPerDay}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <DollarSign className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-sm text-muted-foreground">Penalty</p>
                <p className="text-xl font-semibold">
                  ${challenge.penaltyAmount}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <Users className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Members</p>
                <p className="text-xl font-semibold">
                  {leaderboard.length}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <Clock className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">Progress</p>
                <p className="text-xl font-semibold">{progress}%</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Bar */}
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between mb-2 text-sm">
              <span>Challenge Progress</span>
              <span>
                {totalDays - daysRemaining} of {totalDays} days
              </span>
            </div>
            <Progress value={progress} className="h-3" />
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="members">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="members">
            <Card>
              <CardHeader>
                <CardTitle>Leaderboard</CardTitle>
              </CardHeader>
              <CardContent>
                {leaderboard.map((member, index) => (
                  <div
                    key={member.userId}
                    className="flex justify-between p-3 border rounded-lg mb-2"
                  >
                    <span>#{index + 1} {member.userName}</span>
                    <span>Penalty: ${member.totalPenalty}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress">
            <ProgressChart
              data={mockChartData}
              title="Team Progress"
            />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ChallengePage;