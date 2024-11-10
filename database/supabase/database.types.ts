export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      colleges: {
        Row: {
          college_name: string
          id: number
        }
        Insert: {
          college_name: string
          id?: number
        }
        Update: {
          college_name?: string
          id?: number
        }
        Relationships: []
      }
      family_situations: {
        Row: {
          family_situation_name: string
          id: number
        }
        Insert: {
          family_situation_name: string
          id?: number
        }
        Update: {
          family_situation_name?: string
          id?: number
        }
        Relationships: []
      }
      grades: {
        Row: {
          grade_name: string
          id: number
        }
        Insert: {
          grade_name: string
          id?: number
        }
        Update: {
          grade_name?: string
          id?: number
        }
        Relationships: []
      }
      refresh_tokens: {
        Row: {
          created_at: string
          expires_at: string
          refresh_token: string
          token_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          expires_at?: string
          refresh_token: string
          token_id?: number
          user_id: string
        }
        Update: {
          created_at?: string
          expires_at?: string
          refresh_token?: string
          token_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "refresh_tokens_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          id: number
          role: string
        }
        Insert: {
          id?: number
          role: string
        }
        Update: {
          id?: number
          role?: string
        }
        Relationships: []
      }
      sessions: {
        Row: {
          id: number
          session_name: string
        }
        Insert: {
          id?: number
          session_name: string
        }
        Update: {
          id?: number
          session_name?: string
        }
        Relationships: []
      }
      student_jobs: {
        Row: {
          id: number
          student_job_name: string
        }
        Insert: {
          id?: number
          student_job_name: string
        }
        Update: {
          id?: number
          student_job_name?: string
        }
        Relationships: []
      }
      students: {
        Row: {
          address: string
          college_id: number
          created_at: string
          date_of_birth: string
          english_name: string
          facebook_or_email: string
          family_situation_id: number
          father_name: string
          father_nationality: string
          father_occupation: string
          father_phone_number: string
          generation: number
          grade_id: number
          id: number
          khmer_name: string
          mother_name: string
          mother_nationality: string
          mother_occupation: string
          mother_phone_number: string
          nationality: string
          phone_number: string
          session_id: number
          sex: string
          student_job_id: number
          subject_id: number
        }
        Insert: {
          address: string
          college_id: number
          created_at?: string
          date_of_birth: string
          english_name: string
          facebook_or_email: string
          family_situation_id: number
          father_name: string
          father_nationality: string
          father_occupation: string
          father_phone_number: string
          generation: number
          grade_id: number
          id?: number
          khmer_name: string
          mother_name: string
          mother_nationality: string
          mother_occupation: string
          mother_phone_number: string
          nationality: string
          phone_number: string
          session_id: number
          sex: string
          student_job_id: number
          subject_id: number
        }
        Update: {
          address?: string
          college_id?: number
          created_at?: string
          date_of_birth?: string
          english_name?: string
          facebook_or_email?: string
          family_situation_id?: number
          father_name?: string
          father_nationality?: string
          father_occupation?: string
          father_phone_number?: string
          generation?: number
          grade_id?: number
          id?: number
          khmer_name?: string
          mother_name?: string
          mother_nationality?: string
          mother_occupation?: string
          mother_phone_number?: string
          nationality?: string
          phone_number?: string
          session_id?: number
          sex?: string
          student_job_id?: number
          subject_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "students_college_id_fkey"
            columns: ["college_id"]
            isOneToOne: false
            referencedRelation: "colleges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "students_family_situation_id_fkey"
            columns: ["family_situation_id"]
            isOneToOne: false
            referencedRelation: "family_situations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "students_grade_id_fkey"
            columns: ["grade_id"]
            isOneToOne: false
            referencedRelation: "grades"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "students_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "students_student_job_id_fkey"
            columns: ["student_job_id"]
            isOneToOne: false
            referencedRelation: "student_jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "students_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      subjects: {
        Row: {
          id: number
          subject_name: string
        }
        Insert: {
          id?: number
          subject_name: string
        }
        Update: {
          id?: number
          subject_name?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string
          email: string
          full_name: string | null
          id: string
          password_hash: string
          role_id: number
        }
        Insert: {
          created_at?: string
          email: string
          full_name?: string | null
          id?: string
          password_hash: string
          role_id: number
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          password_hash?: string
          role_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "users_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_jwt_token: {
        Args: {
          user_id: string
        }
        Returns: string
      }
      get_student: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: number
          generation: number
          khmer_name: string
          english_name: string
          date_of_birth: string
          sex: string
          nationality: string
          address: string
          phone_number: string
          facebook_or_email: string
          father_name: string
          father_nationality: string
          father_occupation: string
          father_phone_number: string
          mother_name: string
          mother_nationality: string
          mother_occupation: string
          mother_phone_number: string
          session: string
          session_id: number
          subject: string
          subject_id: number
          college: string
          college_id: number
          grade: string
          grade_id: number
          family_situation: string
          family_situation_id: number
          student_job: string
          student_job_id: number
        }[]
      }
      get_student_by_id: {
        Args: {
          p_id: number
        }
        Returns: {
          id: number
          generation: number
          khmer_name: string
          english_name: string
          date_of_birth: string
          sex: string
          nationality: string
          address: string
          phone_number: string
          facebook_or_email: string
          father_name: string
          father_nationality: string
          father_occupation: string
          father_phone_number: string
          mother_name: string
          mother_nationality: string
          mother_occupation: string
          mother_phone_number: string
          session: string
          session_id: number
          subject: string
          subject_id: number
          college: string
          college_id: number
          grade: string
          grade_id: number
          family_situation: string
          family_situation_id: number
          student_job: string
          student_job_id: number
        }[]
      }
      get_user_profile: {
        Args: {
          _refresh_token: string
        }
        Returns: {
          created_at: string
          email: string
          full_name: string | null
          id: string
          password_hash: string
          role_id: number
        }[]
      }
      insert_student: {
        Args: {
          generation: number
          khmer_name: string
          english_name: string
          date_of_birth: string
          sex: string
          nationality: string
          address: string
          phone_number: string
          facebook_or_email: string
          father_name: string
          father_nationality: string
          father_occupation: string
          father_phone_number: string
          mother_name: string
          mother_nationality: string
          mother_occupation: string
          mother_phone_number: string
          session: string
          subject: string
          college: string
          grade: string
          family_situation: string
          student_job: string
        }
        Returns: undefined
      }
      login_user: {
        Args: {
          _email: string
          _password: string
        }
        Returns: {
          success: boolean
          refresh_token: string
          message: string
        }[]
      }
      logout_user: {
        Args: {
          _refresh_token: string
        }
        Returns: {
          success: boolean
          message: string
        }[]
      }
      register_user: {
        Args: {
          _full_name: string
          _email: string
          _password: string
          _role_id: number
        }
        Returns: {
          success: boolean
          message: string
        }[]
      }
      reset_user_password: {
        Args: {
          _email: string
          _new_password: string
        }
        Returns: {
          success: boolean
          message: string
        }[]
      }
      verify_jwt_token: {
        Args: {
          token: string
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

