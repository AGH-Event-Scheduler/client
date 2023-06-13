export interface OrganizationShortInfo {
  id: number;
  imageUrl: string;
  name: string;
  isSubscribed: boolean;
}

export const fetchOrganizationsList = (): Promise<OrganizationShortInfo[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      //TODO implement API
      const buttonList: OrganizationShortInfo[] = [
        {
          id: 1,
          imageUrl:
            "https://images.ctfassets.net/hvenzvkwiy9m/2k6DY1kwOBQhahKuCbpIvc/bb03660786772eb34283a43d01f06163/creative_____kopia.jpg",
          name: "Koło naukowe Creative",
          isSubscribed: true,
        },
        {
          id: 2,
          imageUrl:
            "https://images.ctfassets.net/hvenzvkwiy9m/6lDoTg2CZHE6PXtFcMN3QU/ff7406cb993c922d0673217941691700/sygnet_z_podpisem_-na_jasne_t_____o-.png",
          name: "KN osób Studiujących Socjologię",
          isSubscribed: false,
        },
        {
          id: 3,
          imageUrl:
            "https://images.ctfassets.net/hvenzvkwiy9m/2hGRA4ipUETBw2l5dpxXFb/a6f465d9ca7566722c19b766f37505f3/LOGO.png",
          name: "KN Energon",
          isSubscribed: false,
        },

        {
          id: 4,
          imageUrl:
            "https://images.ctfassets.net/hvenzvkwiy9m/2hGRA4ipUETBw2l5dpxXFb/a6f465d9ca7566722c19b766f37505f3/LOGO.png",
          name: "KN Energon",
          isSubscribed: false,
        },

        {
          id: 5,
          imageUrl:
            "https://images.ctfassets.net/hvenzvkwiy9m/2hGRA4ipUETBw2l5dpxXFb/a6f465d9ca7566722c19b766f37505f3/LOGO.png",
          name: "KN Energon",
          isSubscribed: false,
        },

        {
          id: 6,
          imageUrl:
            "https://images.ctfassets.net/hvenzvkwiy9m/6lDoTg2CZHE6PXtFcMN3QU/ff7406cb993c922d0673217941691700/sygnet_z_podpisem_-na_jasne_t_____o-.png",
          name: "KN osób Studiujących Socjologię",
          isSubscribed: false,
        },

        {
          id: 7,
          imageUrl:
            "https://images.ctfassets.net/hvenzvkwiy9m/6lDoTg2CZHE6PXtFcMN3QU/ff7406cb993c922d0673217941691700/sygnet_z_podpisem_-na_jasne_t_____o-.png",
          name: "KN osób Studiujących Socjologię",
          isSubscribed: false,
        },
        {
          id: 8,
          imageUrl:
            "https://images.ctfassets.net/hvenzvkwiy9m/2k6DY1kwOBQhahKuCbpIvc/bb03660786772eb34283a43d01f06163/creative_____kopia.jpg",
          name: "Koło naukowe Creative",
          isSubscribed: true,
        },
      ];
      resolve(buttonList);
    }, 1000);
  });
};

export const updateSubscriptionStatus = async (
  organizationId,
  isSubscribed
) => {
  try {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(
          `Subscription status updated for organization ${organizationId}`
        );
      }, 1000);
    });
  } catch (error) {
    console.log("Fetch organizations list error:", error);
  }
};
