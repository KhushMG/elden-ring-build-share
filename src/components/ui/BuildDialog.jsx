import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function BuildDialog({ onBuildNameChange} ) {
  const [buildName, setBuildName] = useState("");
  const [open, setOpen] = useState(false);

  const handleSave = () => {
    onBuildNameChange(buildName);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-gray-300 border-2 hover:bg-black hover:text-white transition ease-in-out duration-200"
        >
          Edit Build Name
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editing Build Name</DialogTitle>
          <DialogDescription>Name your build!</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="buildName" className="text-right">
              Build Name
            </Label>
            <Input
              id="buildName"
              value={buildName}
              className="col-span-3"
              onChange={(e) => setBuildName(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSave}>
            Save build name
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    
  );
}
