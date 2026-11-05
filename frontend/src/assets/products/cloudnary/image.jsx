import { Cloudinary } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';

const cld = new Cloudinary({ cloud: { cloudName: 'dmuscpoi5' } });

export function cloudImage(publicId, width = 300, height = 300) {
    return cld
    .image(publicId)
    .resize(fill().width(width).height(height));
}

export const images = {
    // Whey Protein
    protein: cloudImage('PROTEIN-CRUSH-CHOCOTINE._ybkvbu.png'),
    banner: cloudImage('WHEY-MAX-DR_PEANUT_hlmrqh', 650, 650),
    whey_dux: cloudImage('DUX-CONCENTRADO_codqlo'),
    whey_double_tasty: cloudImage('MAX-DOUBLE-TASTY-MORANGO_nzhkrb'),
    whey_isofort: cloudImage('ISOFORT-VITAFOR_liemlr'),
    whey_probiotica: cloudImage('PURE-WHEY-PROBIOTICA_vkulrw'),
    whey_fontivia: cloudImage('Beauty-protein-SHARKPRO_dsea1k'),
    whey_beef: cloudImage('BEEF-PROTEIN-LARANJA-ACEROLA_dtlwcz'),
    whey_best_vegan: cloudImage('Whey-best-vegan-cacau_x1wypb'),

    // Creatinas
    crea_vegetal: cloudImage('creatina-premium_zygj06'),
    crea_atlhetica: cloudImage('Creatina-atlhetica-2_ykh6nz'),
    crea_shark_pro: cloudImage('CREATINA-SHARKPRO-PREMIUM_fpbpz1'),
    crea_vitafor: cloudImage('CREATINA-VITAFOR_hkrqbe'),
    crea_longjack: cloudImage('creapure_nj9njz'),
    crea_probiotica: cloudImage('CREATINA-PROBIOTICA_v30wa1'),

    // Pré-treino & Cafeínas
    pre_sharkpro: cloudImage('SHARK-ENERGY-PRE-WORKOUT_meoase'),
    beta_alanina: cloudImage('Beta-alanina_pwyufp'),
    cafeina: cloudImage('cafeína-catarinense_lgdt8d'),

}
