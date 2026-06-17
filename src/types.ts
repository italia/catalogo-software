export interface CatalogueItem {
  id: string;
  category: string;
  description: string;
  icon: string;
  logo: string;
  fallback: string;
  name: string;
  url: string;
}

export interface SearchFilters {
  categories: string[];
  developmentStatuses: string[];
  intendedAudiences: string[];
  pnrr: boolean;
  pnrrTargets: string;
  pnrrMeasures: string;
}

export interface SearchState {
  searchValue: string;
  filters: SearchFilters;
  sortBy: string;
  type: string;
  page: number;
}

export interface SoftwareDetail {
  id: string;
  slug: string;
  publiccode: {
    name: string;
    url?: string;
    landingURL?: string;
    releaseDate?: string;
    logo?: string;
    developmentStatus?: string;
    softwareType?: string;
    softwareVersion?: string;
    publiccodeYmlVersion?: string;
    applicationSuite?: string;
    roadmap?: string;
    platforms?: string[];
    categories?: string[];
    usedBy?: string[];
    intendedAudience?: { scope?: string[]; countries?: string[] };
    description: Record<
      string,
      {
        localisedName?: string;
        genericName?: string;
        shortDescription?: string;
        longDescription?: string;
        features?: string[];
        screenshots?: string[];
        documentation?: string;
        apiDocumentation?: string;
      }
    >;
    legal?: {
      license?: string;
      mainCopyrightOwner?: string;
      repoOwner?: string;
    };
    maintenance?: {
      type?: string;
      contractors?: Array<{ name?: string; until?: string }>;
      contacts?: Array<{ name?: string; email?: string; phone?: string; affiliation?: string }>;
    };
    localisation?: { localisationReady?: boolean; availableLanguages?: string[] };
    dependsOn?: {
      open?: Array<{ name: string; optional?: boolean; version?: string; versionMin?: string; versionMax?: string }>;
      proprietary?: Array<{ name: string; optional?: boolean; version?: string; versionMin?: string; versionMax?: string }>;
    };
    it?: {
      riuso?: { codiceIPA?: string };
      conforme?: {
        lineeGuidaDesign?: boolean;
        misureMinimeSicurezza?: boolean;
        modelloInteroperabilita?: boolean;
        gdpr?: boolean;
      };
      piattaforme?: {
        spid?: boolean;
        cie?: boolean;
        anpr?: boolean;
        pagopa?: boolean;
        io?: boolean;
      };
    };
    IT?: {
      riuso?: { codiceIPA?: string };
      conforme?: {
        lineeGuidaDesign?: boolean;
        misureMinimeSicurezza?: boolean;
        modelloInteroperabilita?: boolean;
        gdpr?: boolean;
      };
      piattaforme?: {
        spid?: boolean;
        cie?: boolean;
        anpr?: boolean;
        pagopa?: boolean;
        io?: boolean;
      };
    };
    organisation?: { uri?: string; name?: string };
  };
  vitalityScore?: number;
  'it-riuso-codiceIPA'?: string;
  'it-riuso-codiceIPA-label'?: string;
}
