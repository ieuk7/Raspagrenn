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
      let valueToSave = newValue;
      if (fieldId === 'phone') {
        valueToSave = newValue.replace(/\D/g, '');
      }
      await onSave(fieldId, valueToSave);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (fieldId === 'phone') {
      let value = e.target.value.replace(/\D/g, '');
      value = value.substring(0, 11);
      const len = value.length;
      let formattedValue = '';

      if (len === 0) {
          formattedValue = '';
      } else if (len <= 2) {
          formattedValue = `(${value}`;
      } else if (len <= 6) { // (XX) XXXX
          formattedValue = `(${value.slice(0, 2)}) ${value.slice(2)}`;
      } else if (len <= 10) { // (XX) XXXX-XXXX
          formattedValue = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
      } else { // 11 digits: (XX) 9 XXXX-XXXX
          formattedValue = `(${value.slice(0, 2)}) ${value.slice(2, 3)} ${value.slice(3, 7)}-${value.slice(7)}`;
      }
      setNewValue(formattedValue);
    } else {
      setNewValue(e.target.value);
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
              onChange={handleInputChange}
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
