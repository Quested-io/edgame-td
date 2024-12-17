import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Level } from '@/types/game';
import LevelForm from '@/components/level/LevelForm';
import GamePreview from '@/components/game/GamePreview';

export default function ConfigurePage() {
  const navigate = useNavigate();
  const [previewLevel, setPreviewLevel] = useState<Partial<Level> | null>(null);

  const handleSubmit = (level: Level) => {
    // In a real app, you'd save this to a backend
    const newLevel: Level = {
      ...level,
      id: Date.now().toString(),
    };
    navigate('/levels');
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Create New Level</CardTitle>
          <CardDescription>Configure your custom typing challenge</CardDescription>
        </CardHeader>
        <CardContent>
          <LevelForm
            onSubmit={handleSubmit}
            onPreview={(level) => setPreviewLevel(level)}
          />
        </CardContent>
      </Card>

      <Dialog open={!!previewLevel} onOpenChange={() => setPreviewLevel(null)}>
        <DialogContent className="max-w-3xl">
          {previewLevel && (
            <GamePreview
              level={previewLevel}
              onClose={() => setPreviewLevel(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}