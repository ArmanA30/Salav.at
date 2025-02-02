import {customElement, query, TemplateResult, html, PropertyValues} from 'lit-element';
import '@material/mwc-snackbar';
import {Snackbar} from '@material/mwc-snackbar';
import '@material/mwc-button';

import {BaseElement} from './base-element';
import {appConfig} from '../config';
import {chatRoom} from './chat-room';
import {closeIcon} from './icon';

export interface SnackbarOption {
  open: boolean;
  reason?: string;
  text?: string;
  timeout?: number;
}

@customElement('snack-bar')
export class SnackBar extends BaseElement {
  @query('mwc-snackbar')
    snackbar: Snackbar | undefined;

  protected override render(): TemplateResult {
    this._logger.logMethod('render');
    return html`
      <mwc-snackbar leading labelText="متن فارسی نمونه ...">
        <!-- <mwc-button slot="action">خب</mwc-button> -->
        <mwc-icon-button slot="dismiss">${closeIcon}</mwc-icon-button>
      </mwc-snackbar>
    `;
  }

  protected override firstUpdated(_changedProperties: PropertyValues):void {
    super.firstUpdated(_changedProperties);
    this._logger.logMethod('firstUpdated');

    chatRoom.onPropertyChanged('snackbar', (snackbarOption: SnackbarOption | unknown) => {
      if (!(this.snackbar && snackbarOption && 'open' in (snackbarOption as SnackbarOption))) return;
      const _snackbarOption = snackbarOption as SnackbarOption;
      this.snackbar.labelText = _snackbarOption.text || '';
      this.snackbar.timeoutMs = _snackbarOption.timeout || appConfig.snackbarTimeout;
      this.snackbar.open = _snackbarOption.open;
    });
  }
}
