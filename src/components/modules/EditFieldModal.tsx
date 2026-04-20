import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface EditFieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  fieldName: string;
  fieldValue: string;
  onSave: (newValue: string) => void;
}

const EditFieldModal: React.FC<EditFieldModalProps> = ({ 
  isOpen, 
  onClose, 
  fieldName, 
  fieldValue, 
  onSave 
}) => {
  const [value, setValue] = useState(fieldValue);

  React.useEffect(() => {
    setValue(fieldValue);
  }, [fieldValue]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-bg-card border-border-default">
        <DialogHeader>
          <DialogTitle className="text-display font-bold">Edit {fieldName.replace(/_/g, ' ')}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label className="text-xs text-text-muted uppercase tracking-wider font-bold">Content</Label>
            <Textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="min-h-[150px] bg-bg-primary border-border-default focus:border-gold/50"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose} className="text-text-muted">Cancel</Button>
          <Button onClick={() => onSave(value)} className="bg-gold hover:bg-gold-light text-background font-bold px-6">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditFieldModal;
