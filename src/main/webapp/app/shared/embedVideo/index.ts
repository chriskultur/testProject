import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EmbedVideoService} from './embed-video.service';

export * from './embed-video.service';

@NgModule({
	imports: [CommonModule],
	declarations: [],
	exports: [],
	providers: [EmbedVideoService]
})
export class EmbedVideo {
	static forRoot(): ModuleWithProviders<any> {
		return {
			ngModule: EmbedVideo,
			providers: [EmbedVideoService]
		};
	}
}
