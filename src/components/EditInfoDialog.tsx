'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Pencil } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EditInfoDialogProps {
  fieldLabel: string;
  fieldId: string;
  currentValue: string;
  onSave: (field: string, value: string) => Promise<void>;
  icon: React.ReactNode;
  placeholder: string;
}

export function EditInfoDialog({ fieldLabel, fieldId, currentValue, onSave, icon, placeholder }: EditInfoDialogProps) {
  const [newValue, setNewValue] = useState(currentValue);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    try {
      await onSave(fieldId, newValue);
      toast({ title: `${fieldLabel} atualizado com sucesso!` });
      setIsOpen(false);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: `Erro ao atualizar ${fieldLabel}`,
        description: error.message,
      });
    }
  };

  useEffect(() => {
    setNewValue(currentValue);
  }, [currentValue]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <div className="info-item">
        <div>
          <p className="info-item-label">{fieldLabel}</p>
          <p className="info-item-value">
            {icon}
            <span>{currentValue || placeholder}</span>
          </p>
        </div>
        <DialogTrigger asChild>
          <Button className="edit-button">
            <Pencil size={14} />
            Editar
          </Button>
        </DialogTrigger>
      </div>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar {fieldLabel}</DialogTitle>
          <DialogDescription>
            Faça alterações no seu {fieldLabel.toLowerCase()} aqui. Clique em salvar quando terminar.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor={fieldId} className="text-right">
              {fieldLabel}
            </Label>
            <Input
              id={fieldId}
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              className="col-span-3"
              placeholder={placeholder}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
             <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button onClick={handleSave}>Salvar alterações</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
