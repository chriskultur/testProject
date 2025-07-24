// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root' // Add this to ensure your SEO service will be app-wide available
})
export class MetatagsService {
  constructor(private title: Title, private meta: Meta) { }


  updateSeoTags(titel : string, beschreibung: string, image :string):boolean {
    this.title.setTitle(titel)
    /** Awesome Website meta tags **/
    this.meta.updateTag({
      name: "description",
      content: beschreibung,
    })

    /** OpenGraph meta tags **/
    this.meta.updateTag({
      property: "og:title",
      content: titel,
    })

    this.meta.updateTag({
      property: "og:description",
      content: beschreibung,
    })

    this.meta.updateTag({
      property: "og:type",
      content: "article",
    })
    // let picture = '';
    // if(this.prodMedia.filter(gallery => gallery.mediatypCode == 1 && gallery.reihenfolge == 0).length!=0){
    //   let pic = this.prodMedia.filter(gallery => gallery.mediatypCode == 1 && gallery.reihenfolge == 0)[0];
    //   picture = 'data:' + pic.mediaContentType + ';base64,' + pic.media;
    // }
    this.meta.updateTag({
      property: "og:image",
      content: image
    })

    // this.meta.updateTag({
    //   property: "og:url",
    //   content: this.article.canonicalUrl,
    // })

    // this.meta.updateTag({
    //   property: "article:published_time",
    //   content: this.article.createdAt.toISOString(),
    // })

    this.meta.updateTag({
      property: "article:author",
      content: "Author name",
    })

    /** Twitter Card meta tags **/
    this.meta.updateTag({
      name: "twitter:card",
      content: "summary_large_image",
    })

    this.meta.updateTag({
      name: "twitter:site",
      content: "@YourTwitterHandle",
    })

    this.meta.updateTag({
      name: "twitter:creator",
      content: "@YourTwitterHandle",
    })

    this.meta.updateTag({
      name: "twitter:title",
      content: titel,
    })
    this.meta.updateTag({
      name: "twitter:description",
      content: beschreibung,
    })
    this.meta.updateTag({
      name: "twitter:image",
      content: image,
    })
    this.meta.updateTag({
      name: "twitter:image:alt",
      content: titel,
    })
    return true;
  }
}
