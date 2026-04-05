import { propertyGroups } from 'stylelint-config-clean-order';

const propertiesOrder = propertyGroups.map((properties) => ({
  noEmptyLineBetween: true,
  emptyLineBefore: 'never',
  properties,
}));

export default {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-clean-order', 'stylelint-config-prettier-scss'],
  rules: {
    'selector-class-pattern': '[a-z][a-zA-Z1-9]+$',
    'color-hex-length': 'short',
    'shorthand-property-no-redundant-values': true,
    'alpha-value-notation': 'number',
    'media-feature-range-notation': 'prefix',
    'font-family-no-missing-generic-family-keyword': null,
    'no-descending-specificity': null,
    'at-rule-empty-line-before': [
      'always',
      {
        except: ['blockless-after-same-name-blockless', 'blockless-after-blockless'],
        ignore: ['first-nested', 'after-comment'],
      },
    ],
    'order/properties-order': [
      propertiesOrder,
      {
        severity: 'warning',
        unspecified: 'bottomAlphabetical',
      },
    ],
    'order/order': [
      'custom-properties',
      {
        type: 'at-rule',
        name: 'extend',
      },
      {
        type: 'at-rule',
        name: 'include',
        hasBlock: false,
      },
      'declarations',
      {
        type: 'at-rule',
        name: 'include',
        hasBlock: true,
      },
    ],
  },
};
