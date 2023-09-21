export interface Glimpse {
  id: string;
  /**
   * URL slug used to identify the Glimpse.
   */
  slug: string;
  /**
   * String representation of the Rich Text Editor's HTML.
   */
  content: string;
  /**
   * Remaining time before the Glimpse is deleted.
   */
  lifetime: Date;
  /**
   * Secret key to allow those who know it to edit the Glimpse. If not provided, the Glimpse is editable by anyone.
   */
  secret: string | null;
  /**
   * Count of how many accesses the Glimpse has.
   */
  accessCount: number;
  /**
   * Wether the Glimpse is public or not. Public Glimpses may appear in the landing page, while private Glimpses can only be accessed via link.
   */
  isPublic: boolean;
  /**
   * Path to the thumb image. Optional.
   */
  thumb: string | null;
  /**
   * Date of when the Glimpse was created.
   */
  createdAt: Date;
}
