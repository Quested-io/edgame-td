import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Event } from "@/types/infinite";

interface EventDialogProps {
  event: Event | null;
  onClose: () => void;
}

export default function EventDialog({ event, onClose }: EventDialogProps) {
  if (!event) return null;

  const handleOption = (effect: () => void) => {
    effect();
    onClose();
  };

  return (
    <Dialog open={!!event} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{event.title}</DialogTitle>
          <DialogDescription>{event.description}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2">
          {event.options.map((option, index) => (
            <Button
              key={index}
              onClick={() => handleOption(option.effect)}
              variant={index === event.options.length - 1 ? "outline" : "default"}
            >
              {option.text}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
