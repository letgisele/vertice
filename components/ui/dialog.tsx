'use client';
import * as React from 'react';
import * as D from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Dialog = D.Root;
export const DialogTrigger = D.Trigger;
export const DialogTitle = D.Title;
export const DialogDescription = D.Description;

export function DialogContent ({
	                               children,
	                               className,
	                               closeLabel = 'Close',
	                               ...props
                               }: React.ComponentProps<typeof D.Content> & { closeLabel?: string }) {
	return <D.Portal><D.Overlay className="dialog-overlay"/><D.Content
		className={ cn('dialog-content', className) } { ...props }>{ children }<D.Close className="dialog-close"
	                                                                                  aria-label={ closeLabel }><X
		size={ 20 }/></D.Close></D.Content></D.Portal>;
}
