/**
 * Hand-written to exactly match supabase/migrations/*.sql — `supabase gen
 * types` needs either a local Docker/podman stack or an authenticated CLI
 * session (`supabase login`), neither available in this environment. Follows
 * the exact structural shape the real generator produces (Row/Insert/Update/
 * Relationships per table) since @supabase/postgrest-js's generic inference
 * depends on that exact shape, not just "close enough." Keep in sync by hand
 * whenever a migration changes a table.
 */

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Status = "draft" | "published";

export interface Database {
  public: {
    Tables: {
      admin_profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          role: "admin" | "editor";
          avatar_media_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          role?: "admin" | "editor";
          avatar_media_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          role?: "admin" | "editor";
          avatar_media_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      media_folders: {
        Row: { id: string; name: string; parent_id: string | null; created_at: string };
        Insert: { id?: string; name: string; parent_id?: string | null; created_at?: string };
        Update: { id?: string; name?: string; parent_id?: string | null; created_at?: string };
        Relationships: [];
      };
      media_assets: {
        Row: {
          id: string;
          folder_id: string | null;
          file_name: string;
          storage_path: string;
          mime_type: string;
          kind: "image" | "video" | "pdf" | "other";
          file_size: number | null;
          width: number | null;
          height: number | null;
          alt_text_en: string | null;
          alt_text_ar: string | null;
          uploaded_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          folder_id?: string | null;
          file_name: string;
          storage_path: string;
          mime_type: string;
          kind: "image" | "video" | "pdf" | "other";
          file_size?: number | null;
          width?: number | null;
          height?: number | null;
          alt_text_en?: string | null;
          alt_text_ar?: string | null;
          uploaded_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          folder_id?: string | null;
          file_name?: string;
          storage_path?: string;
          mime_type?: string;
          kind?: "image" | "video" | "pdf" | "other";
          file_size?: number | null;
          width?: number | null;
          height?: number | null;
          alt_text_en?: string | null;
          alt_text_ar?: string | null;
          uploaded_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      site_settings: {
        Row: {
          id: number;
          doctor_name_en: string;
          doctor_name_ar: string;
          clinic_name_en: string;
          clinic_name_ar: string;
          logo_media_id: string | null;
          favicon_media_id: string | null;
          phone: string;
          whatsapp: string;
          emergency_phone: string;
          email: string;
          address_en: string;
          address_ar: string;
          business_hours: Json;
          social_links: Json;
          google_maps_embed_url: string | null;
          google_maps_address_en: string | null;
          google_maps_address_ar: string | null;
          ga_measurement_id: string | null;
          google_ads_id: string | null;
          gtm_container_id: string | null;
          meta_pixel_id: string | null;
          footer_description_en: string;
          footer_description_ar: string;
          footer_copyright_en: string;
          footer_copyright_ar: string;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: Partial<Database["public"]["Tables"]["site_settings"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["site_settings"]["Row"]>;
        Relationships: [];
      };
      nav_links: {
        Row: {
          id: string;
          label_en: string;
          label_ar: string;
          href: string;
          location: "header" | "footer_expertise" | "footer_journey";
          display_order: number;
          is_visible: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          label_en: string;
          label_ar: string;
          href: string;
          location: "header" | "footer_expertise" | "footer_journey";
          display_order?: number;
          is_visible?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          label_en?: string;
          label_ar?: string;
          href?: string;
          location?: "header" | "footer_expertise" | "footer_journey";
          display_order?: number;
          is_visible?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      pages: {
        Row: { id: string; slug: "home" | "dr-ayman-tarek" | "services" | "videos" | "blog" | "contact"; updated_at: string };
        Insert: { id?: string; slug: "home" | "dr-ayman-tarek" | "services" | "videos" | "blog" | "contact"; updated_at?: string };
        Update: { id?: string; slug?: "home" | "dr-ayman-tarek" | "services" | "videos" | "blog" | "contact"; updated_at?: string };
        Relationships: [];
      };
      page_sections: {
        Row: {
          id: string;
          page_id: string;
          section_key: string;
          display_order: number;
          is_visible: boolean;
          status: Status;
          content: Json;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: {
          id?: string;
          page_id: string;
          section_key: string;
          display_order?: number;
          is_visible?: boolean;
          status?: Status;
          content?: Json;
          updated_at?: string;
          updated_by?: string | null;
        };
        Update: {
          id?: string;
          page_id?: string;
          section_key?: string;
          display_order?: number;
          is_visible?: boolean;
          status?: Status;
          content?: Json;
          updated_at?: string;
          updated_by?: string | null;
        };
        Relationships: [];
      };
      page_seo: {
        Row: {
          id: string;
          page_id: string;
          seo_title_en: string | null;
          seo_title_ar: string | null;
          seo_description_en: string | null;
          seo_description_ar: string | null;
          keywords_en: string[];
          keywords_ar: string[];
          canonical_url: string | null;
          og_image_media_id: string | null;
          twitter_image_media_id: string | null;
          schema_jsonld: Json | null;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["page_seo"]["Row"]> & { page_id: string };
        Update: Partial<Database["public"]["Tables"]["page_seo"]["Row"]>;
        Relationships: [];
      };
      services: {
        Row: {
          id: string;
          slug: string;
          title_en: string;
          title_ar: string;
          short_description_en: string;
          short_description_ar: string;
          full_description_en: string;
          full_description_ar: string;
          image_media_id: string | null;
          image_url: string | null;
          icon: string | null;
          recovery_en: string | null;
          recovery_ar: string | null;
          duration_en: string | null;
          duration_ar: string | null;
          display_order: number;
          status: Status;
          seo_title_en: string | null;
          seo_title_ar: string | null;
          seo_description_en: string | null;
          seo_description_ar: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["services"]["Row"]> & { slug: string; title_en: string; title_ar: string };
        Update: Partial<Database["public"]["Tables"]["services"]["Row"]>;
        Relationships: [];
      };
      service_benefits: {
        Row: { id: string; service_id: string; text_en: string; text_ar: string; display_order: number };
        Insert: { id?: string; service_id: string; text_en: string; text_ar: string; display_order?: number };
        Update: { id?: string; service_id?: string; text_en?: string; text_ar?: string; display_order?: number };
        Relationships: [];
      };
      service_process_steps: {
        Row: { id: string; service_id: string; text_en: string; text_ar: string; display_order: number };
        Insert: { id?: string; service_id: string; text_en: string; text_ar: string; display_order?: number };
        Update: { id?: string; service_id?: string; text_en?: string; text_ar?: string; display_order?: number };
        Relationships: [];
      };
      specialties: {
        Row: {
          id: string;
          slug: string;
          title_en: string;
          title_ar: string;
          short_description_en: string;
          short_description_ar: string;
          description_en: string;
          description_ar: string;
          image_media_id: string | null;
          image_url: string | null;
          recovery_en: string | null;
          recovery_ar: string | null;
          duration_en: string | null;
          duration_ar: string | null;
          display_order: number;
          status: Status;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["specialties"]["Row"]> & { slug: string; title_en: string; title_ar: string };
        Update: Partial<Database["public"]["Tables"]["specialties"]["Row"]>;
        Relationships: [];
      };
      videos: {
        Row: {
          id: string;
          slug: string;
          title_en: string;
          title_ar: string;
          short_description_en: string;
          short_description_ar: string;
          description_en: string;
          description_ar: string;
          thumbnail_media_id: string | null;
          thumbnail_url: string | null;
          youtube_url: string;
          duration: string | null;
          category_en: string | null;
          category_ar: string | null;
          is_featured: boolean;
          display_order: number;
          status: Status;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["videos"]["Row"]> & { slug: string; title_en: string; title_ar: string };
        Update: Partial<Database["public"]["Tables"]["videos"]["Row"]>;
        Relationships: [];
      };
      blog_posts: {
        Row: {
          id: string;
          slug: string;
          title_en: string;
          title_ar: string;
          excerpt_en: string;
          excerpt_ar: string;
          content_en: Json;
          content_ar: Json;
          featured_image_media_id: string | null;
          featured_image_url: string | null;
          category_en: string | null;
          category_ar: string | null;
          author_name: string | null;
          author_avatar_media_id: string | null;
          reading_time_minutes: number | null;
          is_featured: boolean;
          status: Status;
          published_at: string | null;
          seo_title_en: string | null;
          seo_title_ar: string | null;
          seo_description_en: string | null;
          seo_description_ar: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["blog_posts"]["Row"]> & { slug: string; title_en: string; title_ar: string };
        Update: Partial<Database["public"]["Tables"]["blog_posts"]["Row"]>;
        Relationships: [];
      };
      blog_tags: {
        Row: { id: string; name_en: string; name_ar: string };
        Insert: { id?: string; name_en: string; name_ar: string };
        Update: { id?: string; name_en?: string; name_ar?: string };
        Relationships: [];
      };
      blog_post_tags: {
        Row: { blog_post_id: string; tag_id: string };
        Insert: { blog_post_id: string; tag_id: string };
        Update: { blog_post_id?: string; tag_id?: string };
        Relationships: [];
      };
      blog_post_gallery: {
        Row: { id: string; blog_post_id: string; media_id: string; display_order: number };
        Insert: { id?: string; blog_post_id: string; media_id: string; display_order?: number };
        Update: { id?: string; blog_post_id?: string; media_id?: string; display_order?: number };
        Relationships: [];
      };
      faq_items: {
        Row: {
          id: string;
          question_en: string;
          question_ar: string;
          answer_en: string;
          answer_ar: string;
          category: "general" | "contact";
          display_order: number;
          status: Status;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["faq_items"]["Row"]> & {
          question_en: string;
          question_ar: string;
          answer_en: string;
          answer_ar: string;
        };
        Update: Partial<Database["public"]["Tables"]["faq_items"]["Row"]>;
        Relationships: [];
      };
      testimonials: {
        Row: {
          id: string;
          patient_name: string;
          country: string | null;
          role_en: string | null;
          role_ar: string | null;
          review_en: string;
          review_ar: string;
          rating: number;
          photo_media_id: string | null;
          video_url: string | null;
          placements: string[];
          display_order: number;
          status: Status;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["testimonials"]["Row"]> & { patient_name: string; review_en: string; review_ar: string };
        Update: Partial<Database["public"]["Tables"]["testimonials"]["Row"]>;
        Relationships: [];
      };
      contact_messages: {
        Row: {
          id: string;
          full_name: string;
          phone: string;
          email: string;
          service_of_interest: string | null;
          message: string | null;
          status: "new" | "contacted" | "closed";
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["contact_messages"]["Row"]> & { full_name: string; phone: string; email: string };
        Update: Partial<Database["public"]["Tables"]["contact_messages"]["Row"]>;
        Relationships: [];
      };
      content_revisions: {
        Row: {
          id: string;
          entity_type: string;
          entity_id: string;
          snapshot: Json;
          created_by: string | null;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["content_revisions"]["Row"]> & { entity_type: string; entity_id: string; snapshot: Json };
        Update: Partial<Database["public"]["Tables"]["content_revisions"]["Row"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      is_admin: { Args: Record<PropertyKey, never>; Returns: boolean };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

export type Tables<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Row"];
export type TablesInsert<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Insert"];
export type TablesUpdate<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Update"];
