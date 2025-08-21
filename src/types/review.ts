export type Review = {
    id:         string;
    data:       Data;
    body:       string;
    filePath:   string;
    digest:     string;
    rendered:   Rendered;
    collection: string;
}

export type Data = {
    title:          string;
    description:    string;
    pubDate:        string;
    visitDate?:     string;
    image:          string;
    averagePrice?:  number;
    categoryArray?: string[];
    important?:     boolean;
}

export type Rendered = {
    html:     string;
    metadata: Metadata;
}

export type Metadata = {
    headings:         any[];
    localImagePaths:  any[];
    remoteImagePaths: any[];
    frontmatter:      Data;
    imagePaths:       any[];
}
