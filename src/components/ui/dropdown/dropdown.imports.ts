import { ZardDropdownMenuItemComponent } from '@/components/ui/dropdown/dropdown-item.component';
import { ZardDropdownMenuContentComponent } from '@/components/ui/dropdown/dropdown-menu-content.component';
import { ZardDropdownDirective } from '@/components/ui/dropdown/dropdown-trigger.directive';
import { ZardDropdownMenuComponent } from '@/components/ui/dropdown/dropdown.component';
import { ZardMenuLabelComponent } from '@/components/ui/menu/menu-label.component';

export const ZardDropdownImports = [
  ZardDropdownMenuComponent,
  ZardDropdownMenuItemComponent,
  ZardMenuLabelComponent,
  ZardDropdownMenuContentComponent,
  ZardDropdownDirective,
] as const;
