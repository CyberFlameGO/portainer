import { useState } from 'react';

import { Environment } from '@/portainer/environments/types';
import { EnvironmentsQueryParams } from '@/portainer/environments/environment.service/index';
import { isKubernetesEnvironment } from '@/portainer/environments/utils';
import { trackEvent } from '@/angulartics.matomo/analytics-services';
import { Button } from '@/portainer/components/Button';

import { KubeconfigPrompt } from './KubeconfigPrompt';
import '@reach/dialog/styles.css';

export interface KubeconfigButtonProps {
  environments: Environment[];
  envQueryParams: EnvironmentsQueryParams;
}
export function KubeconfigButton({
  environments,
  envQueryParams,
}: KubeconfigButtonProps) {
  const [showDialog, setShowDialog] = useState(false);

  if (!environments) {
    return null;
  }

  if (!isKubeconfigButtonVisible(environments)) {
    return null;
  }

  return (
    <div>
      <Button onClick={handleClick}>
        <i className="fas fa-download space-right" /> kubeconfig
      </Button>
      <KubeconfigPrompt
        envQueryParams={envQueryParams}
        onToggleShow={showDialog}
        onToggleClose={handleClose}
      />
    </div>
  );

  function handleClick() {
    if (!environments) {
      return;
    }

    trackEvent('kubernetes-kubectl-kubeconfig-multi', {
      category: 'kubernetes',
    });

    setShowDialog(true);
  }

  function handleClose() {
    setShowDialog(false);
  }

  function isKubeconfigButtonVisible(environments: Environment[]) {
    if (window.location.protocol !== 'https:') {
      return false;
    }
    return environments.some((env) => isKubernetesEnvironment(env.Type));
  }
}
